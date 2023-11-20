package com.example.demo.repositories;

import com.example.demo.entities.Help;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Repository
public interface HelpRepository extends CrudRepository<Help, Integer> {

    @Query(value = "select * from help where side = :side", nativeQuery = true)
    List<Help> findBySide(Integer side);

    @Query(value = "SELECT * FROM help WHERE side = :side AND (supporter IS NULL OR supporter = :supporter) AND help_status IN (:help_status)", nativeQuery = true)
    List<Help> findBySideAndSupporterAndHelpStatus(int side, Integer supporter, List<Integer> help_status);

    @Query(value = "select * from help where side = :side and author = :author and help_status in (:help_status)", nativeQuery = true)
    List<Help> findBySideAndAuthorAndHelpStatus(int side, int author, List<Integer> help_status);

    @Query(value = "select * from help where id = :id", nativeQuery = true)
    List<Help> findHelpById(int id);

    @Query(value = """
            select * from help
            where help_side = :side
            and description like '%'||:desc||'%'
            and type = coalesce(:help_type, type)
            and county in (coalesce(:county, (select * from county where county.voivodeship = :voivodeship), county))
            """, nativeQuery = true)
    List<Help> findNonCompletedHelpRequestsOrOffers(String desc, int help_type, int county, int voivodeship, int side);

    @Query(value = """
            select * from help
            where author = :currentUserId
            or supporter = :currentUserId
            and description like '%'||:description||'%'
            and type = coalesce(:help_type, type)
            and help_status = coalesce(:help_status, help_status)
            and county in (coalesce(:county, (select * from county where county.voivodeship = :voivodeship), county))
            """, nativeQuery = true)
    List<Help> findMyHelpRequestsAndAcceptedHelpOffers(int currentUserId, String description, Integer voivodeship, Integer county,
                                                       Integer help_status, Integer help_type);

    @Query(value = "update help set help_status = help_status+1 where id = :helpId", nativeQuery = true)
    void updateHelpStatus(int helpId);
}
