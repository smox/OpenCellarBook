package org.sm0x.tools.opencellarbook.service.impl;

import org.sm0x.tools.opencellarbook.service.PossiblePTypesForFEffectService;
import org.sm0x.tools.opencellarbook.domain.PossiblePTypesForFEffect;
import org.sm0x.tools.opencellarbook.repository.PossiblePTypesForFEffectRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link PossiblePTypesForFEffect}.
 */
@Service
@Transactional
public class PossiblePTypesForFEffectServiceImpl implements PossiblePTypesForFEffectService {

    private final Logger log = LoggerFactory.getLogger(PossiblePTypesForFEffectServiceImpl.class);

    private final PossiblePTypesForFEffectRepository possiblePTypesForFEffectRepository;

    public PossiblePTypesForFEffectServiceImpl(PossiblePTypesForFEffectRepository possiblePTypesForFEffectRepository) {
        this.possiblePTypesForFEffectRepository = possiblePTypesForFEffectRepository;
    }

    @Override
    public PossiblePTypesForFEffect save(PossiblePTypesForFEffect possiblePTypesForFEffect) {
        log.debug("Request to save PossiblePTypesForFEffect : {}", possiblePTypesForFEffect);
        return possiblePTypesForFEffectRepository.save(possiblePTypesForFEffect);
    }

    @Override
    @Transactional(readOnly = true)
    public List<PossiblePTypesForFEffect> findAll() {
        log.debug("Request to get all PossiblePTypesForFEffects");
        return possiblePTypesForFEffectRepository.findAll();
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<PossiblePTypesForFEffect> findOne(Long id) {
        log.debug("Request to get PossiblePTypesForFEffect : {}", id);
        return possiblePTypesForFEffectRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete PossiblePTypesForFEffect : {}", id);
        possiblePTypesForFEffectRepository.deleteById(id);
    }
}
