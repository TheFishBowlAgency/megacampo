export const GROUP_TITLE_PT: Record<string, string> = {
  Paintballs: 'Bolas',
  Apparel: 'Vestuário',
  Marker: 'Marcador',
  Goggles: 'Máscara',
  Gloves: 'Luvas',
  Meal: 'Refeição',
  'Private Lounge': 'Sala Privada',
  'Biodegradable BBs': 'BBs Biodegradáveis',
  Games: 'Jogos',
  Activities: 'Atividades',
};

export function getGroupTitlePt(title: string): string {
  return GROUP_TITLE_PT[title] ?? title;
}
