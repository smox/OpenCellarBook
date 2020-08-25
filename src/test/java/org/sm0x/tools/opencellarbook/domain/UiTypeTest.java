package org.sm0x.tools.opencellarbook.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import org.sm0x.tools.opencellarbook.web.rest.TestUtil;

public class UiTypeTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UiType.class);
        UiType uiType1 = new UiType();
        uiType1.setId(1L);
        UiType uiType2 = new UiType();
        uiType2.setId(uiType1.getId());
        assertThat(uiType1).isEqualTo(uiType2);
        uiType2.setId(2L);
        assertThat(uiType1).isNotEqualTo(uiType2);
        uiType1.setId(null);
        assertThat(uiType1).isNotEqualTo(uiType2);
    }
}
