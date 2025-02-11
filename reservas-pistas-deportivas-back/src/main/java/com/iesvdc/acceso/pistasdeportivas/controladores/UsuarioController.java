package com.iesvdc.acceso.pistasdeportivas.controladores;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.iesvdc.acceso.pistasdeportivas.modelos.Usuario;
import com.iesvdc.acceso.pistasdeportivas.servicios.ServiUsuario;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



/**
 * Controlador para gestionar SOLO los datos del usuario 
 * que hizo login
 */
@RestController
@RequestMapping("/api/usuario")
public class UsuarioController {    

    @Autowired
    private ServiUsuario serviUsuario;

    @GetMapping
    public Usuario getUser() {
        Usuario u = serviUsuario.getLoggedUser();
        u.setPassword("");
        return u;
    }

    @PostMapping
    public ResponseEntity<Usuario> update(@RequestBody Usuario u) {
        Usuario loggedUser = serviUsuario.getLoggedUser();
        if (u.getId() == loggedUser.getId()) {
            if (u.getPassword()==null) u.setPassword(loggedUser.getPassword());
            if (u.getPassword().length()<=4) u.setPassword(loggedUser.getPassword());
            return ResponseEntity.ok(serviUsuario.save(u));
        } else {
            return ResponseEntity.badRequest().build();
        }
        
    }
    
    
}
