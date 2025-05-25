import React from 'react';

export default function ({ partner, onClick }) {
  const {
    id,
    name,
    type,
    director,
    email,
    phone,
    address,
    tin,
    rating,
    discount,
  } = partner;
  return (
    <div className="button card" key={id} onClick={onClick}>
      <h4 className="flex-row space-betwen">
        <div> {`${type} | ${name}`}</div>
        <div>
          <span className="bold">Скидка:</span> {` ${discount ?? 0}%`}
        </div>
      </h4>
      <div>
        <span className="bold">Директор:</span> {` ${director}`}
      </div>
      <div>
        <span className="bold">Телефон:</span> {` ${phone}`}
      </div>
      <div>
        <span className="bold">Рейтинг:</span> {` ${rating}⭐`}
      </div>
    </div>
  );
}
