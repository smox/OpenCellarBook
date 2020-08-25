package org.sm0x.tools.opencellarbook.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import org.sm0x.tools.opencellarbook.web.rest.TestUtil;

public class MeasureEntryTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MeasureEntry.class);
        MeasureEntry measureEntry1 = new MeasureEntry();
        measureEntry1.setId(1L);
        MeasureEntry measureEntry2 = new MeasureEntry();
        measureEntry2.setId(measureEntry1.getId());
        assertThat(measureEntry1).isEqualTo(measureEntry2);
        measureEntry2.setId(2L);
        assertThat(measureEntry1).isNotEqualTo(measureEntry2);
        measureEntry1.setId(null);
        assertThat(measureEntry1).isNotEqualTo(measureEntry2);
    }
}
