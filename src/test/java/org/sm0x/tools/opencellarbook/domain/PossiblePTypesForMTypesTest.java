package org.sm0x.tools.opencellarbook.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import org.sm0x.tools.opencellarbook.web.rest.TestUtil;

public class PossiblePTypesForMTypesTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PossiblePTypesForMTypes.class);
        PossiblePTypesForMTypes possiblePTypesForMTypes1 = new PossiblePTypesForMTypes();
        possiblePTypesForMTypes1.setId(1L);
        PossiblePTypesForMTypes possiblePTypesForMTypes2 = new PossiblePTypesForMTypes();
        possiblePTypesForMTypes2.setId(possiblePTypesForMTypes1.getId());
        assertThat(possiblePTypesForMTypes1).isEqualTo(possiblePTypesForMTypes2);
        possiblePTypesForMTypes2.setId(2L);
        assertThat(possiblePTypesForMTypes1).isNotEqualTo(possiblePTypesForMTypes2);
        possiblePTypesForMTypes1.setId(null);
        assertThat(possiblePTypesForMTypes1).isNotEqualTo(possiblePTypesForMTypes2);
    }
}
