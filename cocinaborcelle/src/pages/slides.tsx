
import React, { useState, useEffect } from 'react';
import style from '@/styles/Home.module.css';

const Slides: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      showSlide(currentSlide + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  const showSlide = (n: number) => {
    const slides = document.querySelectorAll(`.${style.feedbackCard}`) as NodeListOf<HTMLDivElement>;

    slides[currentSlide].classList.remove(style.active);
    setCurrentSlide((n + slides.length) % slides.length);
    slides[(n + slides.length) % slides.length].classList.add(style.active);
  };

  return (
    <section className={style.feedback}>
      <h2 className={style.feedbackTitle}>SUGESTÃO DE CLIENTES</h2>
      <div className={`${style.feedbackContent} ${style.flexCenter}`}>
        <div className={`${style.feedbackCardContainer}`}>
          <div className={`${style.feedbackCard} ${currentSlide === 0 ? style.active : ''}`}>
            <h3>CLIENTE 1</h3>
            <p>"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur...”</p>
          </div>

          <div className={`${style.feedbackCard} ${currentSlide === 1 ? style.active : ''}`}>
            <h3>CLIENTE 2</h3>
            <p>"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur...”</p>
          </div>

          <div className={`${style.feedbackCard} ${currentSlide === 2 ? style.active : ''}`}>
            <h3>CLIENTE 3</h3>
            <p>"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur...”</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Slides;
