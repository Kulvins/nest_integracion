import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { Personaje } from 'src/model/personaje';

@Injectable()
export class PersonajesService {
    constructor(private readonly configService:ConfigService){}
    async getPersonajes(): Promise<Personaje[]>{
        let url:string = this.configService.get<string>("ENDPOINT_PERSONAJES");
        
        let res = await axios.get(url);
        let data = res.data;
        let personajes = data.results;

        return personajes.map(p=>{
            return {nombre: p.name, imagen: p.image, estado: p.status};
        });
        
    }
}
