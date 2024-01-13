export const getRankingBgColor = (place: number) => {
  switch (Number(place)) {
    case 1:
      return 'bg-yellow-500';
    case 2:
      return 'bg-slate-500';
    case 3:
      return 'bg-yellow-800';
    default:
      return '';
  }
};

export const getRankingColor = (place: number) => {
  switch (Number(place)) {
    case 1:
      return 'text-yellow-500';
    case 2:
      return 'text-slate-500';
    case 3:
      return 'text-yellow-800';
    default:
      return '';
  }
};
