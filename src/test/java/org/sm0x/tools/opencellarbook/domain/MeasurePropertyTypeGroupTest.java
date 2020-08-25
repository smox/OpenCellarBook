package org.sm0x.tools.opencellarbook.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import org.sm0x.tools.opencellarbook.web.rest.TestUtil;

public class MeasurePropertyTypeGroupTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MeasurePropertyTypeGroup.class);
        MeasurePropertyTypeGroup measurePropertyTypeGroup1 = new MeasurePropertyTypeGroup();
        measurePropertyTypeGroup1.setId(1L);
        MeasurePropertyTypeGroup measurePropertyTypeGroup2 = new MeasurePropertyTypeGroup();
        measurePropertyTypeGroup2.setId(measurePropertyTypeGroup1.getId());
        assertThat(measurePropertyTypeGroup1).isEqualTo(measurePropertyTypeGroup2);
        measurePropertyTypeGroup2.setId(2L);
        assertThat(measurePropertyTypeGroup1).isNotEqualTo(measurePropertyTypeGroup2);
        measurePropertyTypeGroup1.setId(null);
        assertThat(measurePropertyTypeGroup1).isNotEqualTo(measurePropertyTypeGroup2);
    }
}
