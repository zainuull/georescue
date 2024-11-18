import outdoors from '../../../assets/satupeta/map/outdoors.png';
import satelite from '../../../assets/satupeta/map/satelite.png';
import basic from '../../../assets/satupeta/map/basic.png';
import dark from '../../../assets/satupeta/map/dark.png';
import light from '../../../assets/satupeta/map/light.png';

export const initialMapSourcesMapbox = {
  outdoors: {
    name: 'Outdoors',
    source: `mapbox://styles/mapbox/outdoors-v11`,
    foto: outdoors,
    state: true,
  },
  dark: {
    name: 'Dark',
    source: `mapbox://styles/mapbox/dark-v10`,
    foto: dark,
    state: false,
  },
  light: {
    name: 'Light',
    source: `mapbox://styles/mapbox/light-v10`,
    foto: light,
    state: false,
  },

  satellite_streets: {
    name: 'Satellite Streets',
    source: `mapbox://styles/mapbox/satellite-streets-v11`,
    foto: satelite,
    state: false,
  },
  basic: {
    name: 'Basic',
    source: `mapbox://styles/mapbox/basic-v9`,
    foto: basic,
    state: false,
  },
};
