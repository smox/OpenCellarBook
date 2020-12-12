package org.sm0x.tools.opencellarbook.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import org.sm0x.tools.opencellarbook.web.rest.TestUtil;

public class PossiblePTypesForFEffectTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PossiblePTypesForFEffect.class);
        PossiblePTypesForFEffect possiblePTypesForFEffect1 = new PossiblePTypesForFEffect();
        possiblePTypesForFEffect1.setId(1L);
        PossiblePTypesForFEffect possiblePTypesForFEffect2 = new PossiblePTypesForFEffect();
        possiblePTypesForFEffect2.setId(possiblePTypesForFEffect1.getId());
        assertThat(possiblePTypesForFEffect1).isEqualTo(possiblePTypesForFEffect2);
        possiblePTypesForFEffect2.setId(2L);
        assertThat(possiblePTypesForFEffect1).isNotEqualTo(possiblePTypesForFEffect2);
        possiblePTypesForFEffect1.setId(null);
        assertThat(possiblePTypesForFEffect1).isNotEqualTo(possiblePTypesForFEffect2);
    }
}
