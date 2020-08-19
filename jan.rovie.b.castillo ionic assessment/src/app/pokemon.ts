export interface Pokemon {
    id: number;
    name: string;
    url: string;
    base_happiness: string;
    capture_rate: string;
    color:  {name: string };
    generation:  {name: string };
    growth_rate:  {name: string };
    habitat:  {name: string };
    flavor_text_entries: any;
 
}