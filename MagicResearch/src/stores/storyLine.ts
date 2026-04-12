import { defineStore } from 'pinia';
import type { StoryLine } from '@/types/ressources';

export const useStoryLineStore = defineStore('storyLine', () => {
  const storyLine: StoryLine[] = [
    {
      id:'story1',
      completed:false,
      name:'Un chercheur sauvage apparait',
      order:1,
      inProgress:false,
      effects:() => {},
      trigger:() =>{

        return true
      }
    }
  ]
  return {storyLine};

});
