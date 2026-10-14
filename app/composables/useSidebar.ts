/** Status buka/tutup sidebar mobile, dipakai bersama oleh topbar dan sidebar. */
export function useSidebar() {
  const open = useState('sidebar-open', () => false)
  return {
    open,
    show: () => (open.value = true),
    hide: () => (open.value = false),
  }
}
