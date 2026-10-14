import { Quaternion, Vector3 } from 'three'

/**
 * Physics ringan untuk kubus di hero (pengganti Rapier, ±1,65 MB).
 *
 * - Gerak di bidang 2D (x, y) dalam satuan piksel CSS, rotasi tetap 3D.
 * - Tabrakan memakai lingkaran pembatas: untuk kubus ±1 cm, bedanya
 *   dengan tabrakan kotak sungguhan tidak terlihat.
 * - Kubus selalu kembali ke kecepatan jelajah (melayang), jadi energi dari
 *   dorongan pointer pelan-pelan hilang dan tidak pernah berhenti total.
 */

export interface CubeBody {
  x: number
  y: number
  vx: number
  vy: number
  /** Kecepatan sudut (rad/s) di sumbu dunia. */
  w: Vector3
  /** Putaran dasar yang dituju saat tidak ada tabrakan. */
  baseW: Vector3
  q: Quaternion
  cruise: number
}

export interface PointerState {
  x: number
  y: number
  vx: number
  vy: number
  active: boolean
}

export interface CubeWorldOptions {
  count: number
  size: number
  width: number
  height: number
  /** Kecepatan jelajah minimum dan maksimum (px/s). */
  cruise: [number, number]
}

const RESTITUTION = 0.9
const MAX_SPEED = 1100
const POINTER_RADIUS = 36
const SPIN_FROM_IMPACT = 0.012
const SUBSTEPS = 2

const rand = (min: number, max: number) => min + Math.random() * (max - min)
const tmpAxis = new Vector3()
const tmpQ = new Quaternion()

function randomUnit() {
  return new Vector3(rand(-1, 1), rand(-1, 1), rand(-1, 1)).normalize()
}

export function createCubeWorld(opts: CubeWorldOptions) {
  const r = opts.size * 0.62
  let halfW = opts.width / 2
  let halfH = opts.height / 2

  const cubes: CubeBody[] = []
  for (let i = 0; i < opts.count; i++) {
    // Cari posisi awal yang tidak bertumpuk (beberapa percobaan saja).
    let x = 0
    let y = 0
    for (let tries = 0; tries < 30; tries++) {
      x = rand(-halfW + r, halfW - r)
      y = rand(-halfH + r, halfH - r)
      if (cubes.every((c) => (c.x - x) ** 2 + (c.y - y) ** 2 > (2.4 * r) ** 2)) break
    }
    const cruise = rand(opts.cruise[0], opts.cruise[1])
    const angle = rand(0, Math.PI * 2)
    const baseW = randomUnit().multiplyScalar(rand(0.25, 0.6))
    cubes.push({
      x,
      y,
      vx: Math.cos(angle) * cruise,
      vy: Math.sin(angle) * cruise,
      w: baseW.clone(),
      baseW,
      q: new Quaternion().setFromAxisAngle(randomUnit(), rand(0, Math.PI * 2)),
      cruise,
    })
  }

  function kickSpin(c: CubeBody, amount: number) {
    c.w.addScaledVector(randomUnit(), amount)
  }

  function walls(c: CubeBody) {
    if (c.x - r < -halfW) {
      c.x = -halfW + r
      c.vx = Math.abs(c.vx) * RESTITUTION
    } else if (c.x + r > halfW) {
      c.x = halfW - r
      c.vx = -Math.abs(c.vx) * RESTITUTION
    }
    if (c.y - r < -halfH) {
      c.y = -halfH + r
      c.vy = Math.abs(c.vy) * RESTITUTION
    } else if (c.y + r > halfH) {
      c.y = halfH - r
      c.vy = -Math.abs(c.vy) * RESTITUTION
    }
  }

  function collide(a: CubeBody, b: CubeBody) {
    const dx = b.x - a.x
    const dy = b.y - a.y
    const dist2 = dx * dx + dy * dy
    const minDist = 2 * r
    if (dist2 >= minDist * minDist || dist2 === 0) return
    const dist = Math.sqrt(dist2)
    const nx = dx / dist
    const ny = dy / dist

    // Pisahkan supaya tidak saling menembus.
    const push = (minDist - dist) / 2
    a.x -= nx * push
    a.y -= ny * push
    b.x += nx * push
    b.y += ny * push

    // Impuls elastis (massa sama).
    const rvx = b.vx - a.vx
    const rvy = b.vy - a.vy
    const vn = rvx * nx + rvy * ny
    if (vn >= 0) return
    const j = (-(1 + RESTITUTION) * vn) / 2
    a.vx -= j * nx
    a.vy -= j * ny
    b.vx += j * nx
    b.vy += j * ny

    // Gesekan di titik kontak membuat kubus ikut berputar.
    const vt = rvx * -ny + rvy * nx
    a.w.z += vt * SPIN_FROM_IMPACT
    b.w.z -= vt * SPIN_FROM_IMPACT
    kickSpin(a, j * SPIN_FROM_IMPACT * 0.5)
    kickSpin(b, j * SPIN_FROM_IMPACT * 0.5)
  }

  function pushByPointer(c: CubeBody, p: PointerState) {
    const dx = c.x - p.x
    const dy = c.y - p.y
    const minDist = r + POINTER_RADIUS
    const dist2 = dx * dx + dy * dy
    if (dist2 >= minDist * minDist) return
    const dist = Math.sqrt(dist2) || 0.001
    const nx = dx / dist
    const ny = dy / dist
    c.x = p.x + nx * minDist
    c.y = p.y + ny * minDist

    // Kubus terlempar sesuai arah gerak pointer, plus dorongan keluar minimal.
    const pn = Math.max(0, p.vx * nx + p.vy * ny)
    const cn = c.vx * nx + c.vy * ny
    const target = Math.max(pn * 1.1, 120)
    if (cn < target) {
      c.vx += nx * (target - cn)
      c.vy += ny * (target - cn)
    }
    kickSpin(c, 0.4 + pn * 0.004)
  }

  function relax(c: CubeBody, dt: number) {
    // Kembali pelan-pelan ke kecepatan jelajah.
    const speed = Math.hypot(c.vx, c.vy)
    if (speed > MAX_SPEED) {
      c.vx *= MAX_SPEED / speed
      c.vy *= MAX_SPEED / speed
    } else if (speed > c.cruise) {
      const k = Math.exp(-1.6 * dt)
      const next = c.cruise + (speed - c.cruise) * k
      c.vx *= next / speed
      c.vy *= next / speed
    } else if (speed < c.cruise * 0.6) {
      const dirX = speed > 1 ? c.vx / speed : Math.cos(rand(0, Math.PI * 2))
      const dirY = speed > 1 ? c.vy / speed : Math.sin(rand(0, Math.PI * 2))
      c.vx += dirX * c.cruise * dt * 0.5
      c.vy += dirY * c.cruise * dt * 0.5
    }

    // Putaran kembali ke putaran dasar.
    c.w.lerp(c.baseW, 1 - Math.exp(-0.9 * dt))

    // Integrasi rotasi (sumbu dunia).
    const angle = c.w.length() * dt
    if (angle > 0) {
      tmpAxis.copy(c.w).normalize()
      tmpQ.setFromAxisAngle(tmpAxis, angle)
      c.q.premultiply(tmpQ)
    }
  }

  function step(dt: number, pointer?: PointerState) {
    const h = Math.min(dt, 1 / 30) / SUBSTEPS
    for (let s = 0; s < SUBSTEPS; s++) {
      for (const c of cubes) {
        c.x += c.vx * h
        c.y += c.vy * h
      }
      for (let i = 0; i < cubes.length; i++) {
        for (let k = i + 1; k < cubes.length; k++) collide(cubes[i]!, cubes[k]!)
      }
      if (pointer?.active) for (const c of cubes) pushByPointer(c, pointer)
      for (const c of cubes) walls(c)
    }
    for (const c of cubes) relax(c, h * SUBSTEPS)
  }

  function resize(width: number, height: number) {
    halfW = width / 2
    halfH = height / 2
    for (const c of cubes) walls(c)
  }

  return { cubes, step, resize }
}
