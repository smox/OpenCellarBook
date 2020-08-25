package org.sm0x.tools.opencellarbook.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import org.sm0x.tools.opencellarbook.web.rest.TestUtil;

public class MeasurePropertyTypeTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MeasurePropertyType.class);
        MeasurePropertyType measurePropertyType1 = new MeasurePropertyType();
        measurePropertyType1.setId(1L);
        MeasurePropertyType measurePropertyType2 = new MeasurePropertyType();
        measurePropertyType2.setId(measurePropertyType1.getId());
        assertThat(measurePropertyType1).isEqualTo(measurePropertyType2);
        measurePropertyType2.setId(2L);
        assertThat(measurePropertyType1).isNotEqualTo(measurePropertyType2);
        measurePropertyType1.setId(null);
        assertThat(measurePropertyType1).isNotEqualTo(measurePropertyType2);
    }
}
