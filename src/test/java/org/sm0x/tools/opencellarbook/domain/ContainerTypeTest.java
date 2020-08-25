package org.sm0x.tools.opencellarbook.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import org.sm0x.tools.opencellarbook.web.rest.TestUtil;

public class ContainerTypeTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ContainerType.class);
        ContainerType containerType1 = new ContainerType();
        containerType1.setId(1L);
        ContainerType containerType2 = new ContainerType();
        containerType2.setId(containerType1.getId());
        assertThat(containerType1).isEqualTo(containerType2);
        containerType2.setId(2L);
        assertThat(containerType1).isNotEqualTo(containerType2);
        containerType1.setId(null);
        assertThat(containerType1).isNotEqualTo(containerType2);
    }
}
