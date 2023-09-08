import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = () => new Promise((resolve) => { setTimeout(resolve, 600); })

const Form = ({ onSuccess, onError }) => {
  // État pour gérer l'envoi du formulaire
  const [sending, setSending] = useState(false);

  // Fonction pour gérer l'envoi du formulaire
  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      setSending(true);
      // We try to call mockContactApi
      try {
        await mockContactApi();
        setSending(false);
        onSuccess(); // Appelé en cas de succès
      } catch (err) {
        setSending(false);
        onError(err); // Appelé en cas d'erreur
      }
    },
    [onSuccess, onError]
  );
  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <Field placeholder="" label="Nom" />
          <Field placeholder="" label="Prénom" />
          <Select
            selection={["Personel", "Entreprise"]}
            onChange={() => null}
            label="Personel / Entreprise"
            type="large"
            titleEmpty
          />
          <Field placeholder="" label="Email" />
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {sending ? "En cours" : "Envoyer"}
          </Button>
        </div>
        <div className="col">
          <Field
            placeholder="message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
          />
        </div>
      </div>
    </form>
  );
};

// Définition des proptypes pour les fonctions (succés & erreur)
Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
}

// Définition des valeurs par défaut
Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
}

export default Form;
