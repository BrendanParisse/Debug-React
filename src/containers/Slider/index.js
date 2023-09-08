import React, { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  // "Data" pour récupérer les données (événements) à afficher
  const { data } = useData();
  // Etat local pour savoir quelle carte afficher
  const [index, setIndex] = useState(0);
  // Etat local pour contrôler la pause du défilement
  const [autoScrollPaused, setAutoScrollPaused] = useState(false);

  // Trie les événements par date décroissante
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtB.date) - new Date(evtA.date)
  );

  // Fonction pour afficher la carte suivante
  const nextCard = () => {
    if (byDateDesc && byDateDesc.length > 0 && !autoScrollPaused) {
      setIndex((prevIndex) =>
        prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0
      );
    }
  };

  // Appel de la fonction nextCard toutes les 5 secondes
  useEffect(() => {
    const timer = setInterval(nextCard, 5000);
    return () => {
      clearInterval(timer);
    };
  }, [index, autoScrollPaused]);

  // Fonction pour mettre en pause le défilement automatique
  const pauseAutoScroll = () => {
    setAutoScrollPaused(true);
  };

  // Fonction pour reprendre le défilement automatique
  const resumeAutoScroll = () => {
    setAutoScrollPaused(false);
  };

  // Contient la liste de "slide" et la pagination
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <React.Fragment key={`${idx + 1}`}>
          <div
            className={`SlideCard SlideCard--${index === idx ? "display" : "hide"
              }`}
            onMouseEnter={pauseAutoScroll}
            onMouseLeave={resumeAutoScroll}

          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                <input
                  key={`${radioIdx + 1}`}
                  type="radio"
                  name="radio-button"
                  checked={index === radioIdx}
                  onChange={() => setIndex(radioIdx)}
                />
              ))}
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Slider;
