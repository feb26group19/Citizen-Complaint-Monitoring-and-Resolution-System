package com.example.demo.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.NoticeDTO;
import com.example.demo.entity.Notice;
import com.example.demo.repository.NoticeRepository;

@Service
public class NoticeService {

    @Autowired
    private NoticeRepository noticeRepository;

    public String addNotice(NoticeDTO dto)
    {
        Notice n = new Notice();

        n.setDeptId(dto.getDeptId());
        n.setLid(dto.getLid());

        n.setAreaName(dto.getAreaName());
        n.setNoticeText(dto.getNoticeText());

        n.setDate(dto.getDate());

        noticeRepository.save(n);

        return "Notice Added Successfully";
    }

    public List<Notice> getAllNotices()
    {
        return noticeRepository.findAll();
    }
}