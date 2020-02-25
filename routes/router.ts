import { Socket } from 'socket.io';
import { Router, Request, Response } from 'express';
import Server from '../classes/server';
import { usuariosConectados } from '../sockets/socket';

const router = Router();

router.get('/mensajes', ( req: Request, res: Response ) => {
    res.json({
        ok: true,
        mensaje: 'Todo ok'
    });
});


router.post('/mensajes', ( req: Request, res: Response ) => {

    const cuerpo = req.body.cuerpo;
    const de = req.body.de;

    const payload = {
        cuerpo, de
    };

    const server = Server.instance;
    server.io.emit('mensaje-nuevo', payload);
    res.json({
        ok: true,
        mensaje: 'POST - Listo',
        cuerpo,
        de
    });
});

router.post('/mensajes/:id', ( req: Request, res: Response ) => {

    const cuerpo = req.body.cuerpo;
    const de     = req.body.de;
    const id     = req.params.id;

    const server = Server.instance;
    const payload = {
        de,
        cuerpo
    };

    server.io.in(id).emit('mensaje-privado', payload);

    res.json({
        ok: true,
        mensaje: 'POST - Listo',
        cuerpo,
        de,
        id
    });
});

// Servicio para obtener los ids de los usuarios
router.get('/usuarios', (req: Request, res: Response) => {
    const server = Server.instance;
    server.io.clients( (err: any, clientes: string[]) => {
        if (err) {
            return res.json({
                ok: false,
                err
            });
        }
        
        res.json({
            ok: true,
            clientes
        });

    }); 
});


// Servicio para usuarios y nomres
router.get('/usuarios/detalle', (req: Request, res: Response) => {
    res.json({
        ok: true,
        clientes: usuariosConectados.getLista()
    });
});
export default router;