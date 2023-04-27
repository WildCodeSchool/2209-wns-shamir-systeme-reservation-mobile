import { Platform } from 'react-native';

// récupère le nombre de jours entre 2 dates string en incluant le jour de fin
export const getPeriod = (from: string, to: string) => {
  const dateFrom = new Date(from).getTime();
  const dateTo = new Date(to).getTime();
  const diff = 1 + ((dateTo - dateFrom) / (1000*3600*24))
  return diff
}

// transforme une date string type datetime en date jj/mm/AAAA
export const readableDate = (stringDate: string) => {
  const date = new Date(stringDate);
  const d =  date.toLocaleDateString('fr-FR');
  const dateArray = d.split('/');
  const formattedDate = dateArray[1] + '/' + dateArray[0] + '/' + dateArray[2];
  return Platform.OS === 'ios' ? d : formattedDate
}
