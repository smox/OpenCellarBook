package org.sm0x.tools.opencellarbook.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import org.sm0x.tools.opencellarbook.web.rest.TestUtil;

public class MeasureTypeTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MeasureType.class);
        MeasureType measureType1 = new MeasureType();
        measureType1.setId(1L);
        MeasureType measureType2 = new MeasureType();
        measureType2.setId(measureType1.getId());
        assertThat(measureType1).isEqualTo(measureType2);
        measureType2.setId(2L);
        assertThat(measureType1).isNotEqualTo(measureType2);
        measureType1.setId(null);
        assertThat(measureType1).isNotEqualTo(measureType2);
    }
}
