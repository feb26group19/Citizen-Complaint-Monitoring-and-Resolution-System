package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.NoticeDTO;
import com.example.demo.entity.Notice;
import com.example.demo.service.NoticeService;

@RestController
@RequestMapping("/notice")
@CrossOrigin("*")
public class NoticeController {

    @Autowired
    private NoticeService noticeService;

    @PostMapping("/add")
    public String addNotice(
            @RequestBody NoticeDTO dto)
    {
        return noticeService.addNotice(dto);
    }

    @GetMapping("/all")
    public List<Notice> getAllNotices()
    {
        return noticeService.getAllNotices();
    }
}