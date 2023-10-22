import {Participation} from "../models/Participation";

export const countMedals = (participations: Participation[]) => {
  return participations.reduce((acc, participation) => acc + participation.medalsCount,0)
}

export const getIconPath = (filename: string) => {
  return `../../assets/images/icons/${filename}`;
}
