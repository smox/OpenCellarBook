package org.sm0x.tools.opencellarbook.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import org.sm0x.tools.opencellarbook.web.rest.TestUtil;

public class MeasurePropertyValueTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MeasurePropertyValue.class);
        MeasurePropertyValue measurePropertyValue1 = new MeasurePropertyValue();
        measurePropertyValue1.setId(1L);
        MeasurePropertyValue measurePropertyValue2 = new MeasurePropertyValue();
        measurePropertyValue2.setId(measurePropertyValue1.getId());
        assertThat(measurePropertyValue1).isEqualTo(measurePropertyValue2);
        measurePropertyValue2.setId(2L);
        assertThat(measurePropertyValue1).isNotEqualTo(measurePropertyValue2);
        measurePropertyValue1.setId(null);
        assertThat(measurePropertyValue1).isNotEqualTo(measurePropertyValue2);
    }
}
