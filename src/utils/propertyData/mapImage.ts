import { Property } from '../../types/property';
import defaultImg from '../../assets/images/propertyListingPlaceholder_small.png';

export const mapImage = (p: Property): string => (p.photos.hero ? p.photos.hero.small : defaultImg);
