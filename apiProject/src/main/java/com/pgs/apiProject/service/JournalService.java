package com.pgs.apiProject.service;

import com.pgs.apiProject.entity.Journal;
import com.pgs.apiProject.repository.JournalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class JournalService {
    @Autowired
    JournalRepository journalRepository;

    public List<Journal> getAll() {
        return journalRepository.findAll();
    }

    public Optional<Journal> getJournalById(String id) {
        return journalRepository.findById(id);
    }
    public void deleteJournal(String id) {
        journalRepository.deleteById(id);
    }
    public void saveJournal (Journal journal) {
        journalRepository.save(journal);
    }
}
