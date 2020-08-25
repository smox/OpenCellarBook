package org.sm0x.tools.opencellarbook.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import org.sm0x.tools.opencellarbook.web.rest.TestUtil;

public class MeasureTypeGroupTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MeasureTypeGroup.class);
        MeasureTypeGroup measureTypeGroup1 = new MeasureTypeGroup();
        measureTypeGroup1.setId(1L);
        MeasureTypeGroup measureTypeGroup2 = new MeasureTypeGroup();
        measureTypeGroup2.setId(measureTypeGroup1.getId());
        assertThat(measureTypeGroup1).isEqualTo(measureTypeGroup2);
        measureTypeGroup2.setId(2L);
        assertThat(measureTypeGroup1).isNotEqualTo(measureTypeGroup2);
        measureTypeGroup1.setId(null);
        assertThat(measureTypeGroup1).isNotEqualTo(measureTypeGroup2);
    }
}
