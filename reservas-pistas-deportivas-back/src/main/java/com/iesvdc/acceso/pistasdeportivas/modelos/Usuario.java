package com.iesvdc.acceso.pistasdeportivas.modelos;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Usuario{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, unique = true,length = 20)
    private String username;
    @Column(nullable = false, length = 80)
    private String password;    
    @Column(nullable = false, unique = true, length = 80)
    private String email; 
    private boolean enabled;
    @Enumerated(EnumType.STRING)
    private Rol tipo;


    public Usuario id(Long id) {
        setId(id);
        return this;
    }

    public Usuario username(String username) {
        setUsername(username);
        return this;
    }

    public Usuario password(String password) {
        setPassword(password);
        return this;
    }

    public Usuario email(String email) {
        setEmail(email);
        return this;
    }

    public Usuario enabled(boolean enabled) {
        setEnabled(enabled);
        return this;
    }

    public Usuario tipo(Rol tipo) {
        setTipo(tipo);
        return this;
    }

}

