/** Whether a header nav link matches the current route. */
export function isNavLinkActive(pathname: string, href: string): boolean {
  if (href === "/cenarios") {
    return pathname === "/cenarios";
  }
  if (href === "/como") {
    return pathname === "/como";
  }
  if (href === "/eventos") {
    return pathname === "/eventos" || pathname.startsWith("/eventos/");
  }
  if (href === "/blog") {
    return pathname === "/blog" || pathname.startsWith("/blog/");
  }
  if (href === "/#actividades" || href === "/atividades") {
    return pathname === "/" || pathname.startsWith("/atividades");
  }
  if (href === "/#reservas" || href === "/reservas") {
    return pathname.startsWith("/reservas") || pathname === "/carrinho";
  }
  if (href === "/carrinho") {
    return pathname === "/carrinho";
  }
  if (href.startsWith("/checkout")) {
    return pathname.startsWith("/checkout");
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}
