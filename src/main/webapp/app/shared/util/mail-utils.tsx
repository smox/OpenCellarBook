import {Translate} from "react-jhipster";
import React from "react";

export function MailTo() {
  return (
    <a href={`mailto:michael.brunner@sm0x.org?subject=OpenCellarBook / Freies Kellerbuch`}>
      <Translate contentKey="misc.email">e-mail</Translate>
    </a>
  )
}
