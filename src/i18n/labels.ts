/** Bilingual admin label (pt / en). */
export type AdminLabel = { pt: string; en: string };

export function bl(pt: string, en: string): AdminLabel {
  return { pt, en };
}

export const common = {
  activity: bl("Atividade", "Activity"),
  alt: bl("Texto alternativo", "Alt text"),
  category: bl("Categoria", "Category"),
  description: bl("Descrição", "Description"),
  group: bl("Grupo", "Group"),
  image: bl("Imagem", "Image"),
  isActive: bl("Ativo", "Active"),
  isDefault: bl("Predefinido", "Default"),
  label: bl("Etiqueta", "Label"),
  name: bl("Nome", "Name"),
  option: bl("Opção", "Option"),
  options: bl("Opções", "Options"),
  priceCents: bl("Preço (cêntimos)", "Price (cents)"),
  slug: bl("Identificador", "Slug"),
  sort: bl("Ordem", "Sort order"),
  title: bl("Título", "Title"),
  type: bl("Tipo", "Type"),
} as const;
