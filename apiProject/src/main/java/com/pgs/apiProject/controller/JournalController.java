package com.pgs.apiProject.controller;

import com.pgs.apiProject.entity.Journal;
import com.pgs.apiProject.service.JournalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/journal")
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
public class JournalController {
    @Autowired
    JournalService journalService;

    @GetMapping
    public List<Journal> getAll(){
        return journalService.getAll();
    }

    @GetMapping("id/{myId}")
    public Journal getJournalById(@PathVariable String myId){
        return journalService.getJournalById(myId).orElse(null);
    }
    @PostMapping
    public Journal createJournal(@RequestBody Journal newJournal) {
        journalService.saveJournal(newJournal);
        return newJournal;
    }

    @DeleteMapping("id/{myId}")
    public boolean deleteJournal(@PathVariable String myId){
        journalService.deleteJournal(myId);
        return true;
    }
    @PutMapping("id/{myId}")
    public String updateJournal(@PathVariable String myId, @RequestBody Journal newJournal){
        Journal old= journalService.getJournalById(myId).orElse(null);
        if (old != null){
            old.setTitle(newJournal.getTitle() != null && !newJournal.getTitle().equals("") ? newJournal.getTitle() : old.getTitle());

            old.setContent(newJournal.getContent() != null && !newJournal.getContent().equals("") ? newJournal.getContent() : old.getContent());

            journalService.saveJournal(old);
            return "Data Successfully Updated";

        }else {
            return ("Record Not Found");
        }
    }
}

//User Request (URL hit)-> Controller -> service -> repository
