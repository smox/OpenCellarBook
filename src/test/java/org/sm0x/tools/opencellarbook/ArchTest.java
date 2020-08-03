package org.sm0x.tools.opencellarbook;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.core.importer.ImportOption;
import org.junit.jupiter.api.Test;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

class ArchTest {

    @Test
    void servicesAndRepositoriesShouldNotDependOnWebLayer() {

        JavaClasses importedClasses = new ClassFileImporter()
            .withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
            .importPackages("org.sm0x.tools.opencellarbook");

        noClasses()
            .that()
                .resideInAnyPackage("org.sm0x.tools.opencellarbook.service..")
            .or()
                .resideInAnyPackage("org.sm0x.tools.opencellarbook.repository..")
            .should().dependOnClassesThat()
                .resideInAnyPackage("..org.sm0x.tools.opencellarbook.web..")
        .because("Services and repositories should not depend on web layer")
        .check(importedClasses);
    }
}
