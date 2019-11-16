export class UsuarioNuevo {

    // Propiedades del usuario 'nuevo' que se registra por primera vez o iniciará sesión
    private _correo: string;
    private _password: string;

    constructor(correo: string, password: string) {
        this._correo = correo;
        this._password = password;
    }

    // Getters y setters
    get correo(): string {
        return this._correo;
    }
    set correo(correo: string) {
        this._correo = correo;
    }

    get password(): string {
        return this._password
    }
    set password(password: string) {
        this._password = password;
    }

}