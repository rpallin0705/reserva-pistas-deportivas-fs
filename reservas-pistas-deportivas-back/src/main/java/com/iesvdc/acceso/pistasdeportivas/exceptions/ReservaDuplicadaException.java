package com.iesvdc.acceso.pistasdeportivas.exceptions;

public class ReservaDuplicadaException extends RuntimeException {
    public ReservaDuplicadaException(String mensaje) {
        super(mensaje);
    }
}