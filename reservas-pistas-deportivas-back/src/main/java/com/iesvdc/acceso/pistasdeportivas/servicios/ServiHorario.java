package com.iesvdc.acceso.pistasdeportivas.servicios;

import com.iesvdc.acceso.pistasdeportivas.modelos.Horario;
import com.iesvdc.acceso.pistasdeportivas.modelos.Instalacion;
import com.iesvdc.acceso.pistasdeportivas.repos.RepoHorario;
import com.iesvdc.acceso.pistasdeportivas.repos.RepoInstalacion;
import com.iesvdc.acceso.pistasdeportivas.repos.RepoReserva;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ServiHorario {

    @Autowired
    private RepoHorario repoHorario;

    @Autowired
    private RepoReserva repoReserva;

    @Autowired
    private ServiInstalacion serviInstalacion;

    public List<Horario> findAll() {
        return repoHorario.findAll();
    }

    public Optional<Horario> findById(Long id) {
        return repoHorario.findById(id);
    }

    public Horario save(Horario horario) {
        return repoHorario.save(horario);
    }

    public void delete(Horario horario) {
        repoHorario.delete(horario);
    }

    public Optional<Horario> update(Long id, Horario horario) {
        return repoHorario.findById(id).map(existing -> {
            existing.setInstalacion(horario.getInstalacion());
            existing.setHoraInicio(horario.getHoraInicio());
            existing.setHoraFin(horario.getHoraFin());
            return repoHorario.save(existing);
        });
    }

    public List<Horario> findByInstalacion(Instalacion instalacion){
        return repoHorario.findByInstalacion(instalacion);
    }

    public List<Horario> findFreeHorarios (Long idInstalacion, LocalDate fecha) {
        Optional<Instalacion> oInstalacion = serviInstalacion.findById(idInstalacion);

        if (oInstalacion.isPresent()) 
            return repoReserva.findHorarioByInstalacionFree(oInstalacion.get(), fecha);
        return new ArrayList<>();
    }
}
