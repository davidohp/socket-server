import { Usuario } from './usuario';
export class UsuariosLista {

    private lista: Usuario[] = [];

    constrctor() {

    }

    public agregar( usuario: Usuario ) {
        this.lista.push( usuario );
        console.log('usuarios', this.lista);
        return usuario;
    }

    public actualizarNombre (id: string, nombre: string ) {
        for ( let usuario of this.lista ) {
            if (usuario.id === id) {
                usuario.nombre = nombre;
                break;
            }
        }

        console.log('*** Actualizando Usuario ***');
        console.log(this.lista);
    }

    public getLista () {
        return this.lista;
    }

    public getUsuario ( id: string ) {
        return this.lista.find( usuario => usuario.id === id );
    }

    public getUusariosEnSala( sala: string ) {
        return this.lista.find( usuario => usuario.sala === sala );
    }

    public borrarUsuario ( id: string ) {
        const tmpUsuario = this.getUsuario( id );
        this.lista = this.lista.filter ( usuario => usuario.id !== id );
        // console.log('lista actual', this.lista);
        return tmpUsuario;
    }
}