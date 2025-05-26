import { useEffect, useState } from 'react';
import { data, useLocation, useNavigate } from 'react-router-dom';

export default function PartnerEditor() {
  useEffect(() => {}, []);
  const navigate = useNavigate();
  const location = useLocation();
  const isEdit = location.state.action === 'edit';
  const pageDescription = isEdit
    ? 'Изменить информацию о партнере'
    : 'Добавить нового партнера';
  const submitButtonDescription = isEdit
    ? 'Подтвердить изменения'
    : 'Добавить партнера';
  const [partner, setPartner] = useState(location.state.partner ?? {});
  console.log(partner);

  const handleSubmit = (e) => {
    console.log(e);
    e.preventDefault();
    const partner={    id:location.state.partner.id,
    name:e.target.name.value,
    type:e.target.type.value,
    director:e.target.director.value,
    email:e.target.email.value,
    phone:e.target.phone.value,
    address:e.target.address.value,
    tin:e.target.tin.value,
    rating:e.target.rating.value}
    if (isEdit) {
      window.api.editPartner(partner)
      return
    }
    window.api.addPartner(partner)
    e.target.reset()
  };

  document.title = pageDescription;
  return (
    <div className='flex-column'>
      <h1>{pageDescription}</h1>
      <form action="" className="flex-column frame" onSubmit={handleSubmit}>
        <label htmlFor="type">Тип предприятия</label>
        <select name="" id="type" defaultValue={partner.type ?? 'ООО'}>
          <option value="ЗАО">ЗАО</option>
          <option value="ОАО">ОАО</option>
          <option value="ООО">ООО</option>
          <option value="ПАО">ПАО</option>
        </select>
        <label htmlFor="name">Наименование партнера</label>
        <input required id="name" type="text" defaultValue={partner.name ?? ''} />

        <label htmlFor="director">ФИО директора</label>
        <input required
          id="director"
          type="text"
          defaultValue={partner.director ?? ''}
        />
        <label htmlFor="email">Электронная почта</label>
        <input required id="email" type="email" defaultValue={partner.email ?? ''} />
        <label htmlFor="phone">Номер телефона</label>
        <input required id="phone" type="tel" defaultValue={partner.phone ?? ''} />

        <label htmlFor="address " >Юридический адрес</label>
        <textarea required id="address" className='big-text-box' type="text" defaultValue={partner.address ?? ''} />

        <label htmlFor="tin">ИНН партнера</label>
        <input required id="tin" type="number" defaultValue={partner.tin ?? ''} />
        
        <label htmlFor="rating">Рейтинг</label>
        <input required  id="rating" type="number" min="0" max="10" defaultValue={partner.rating ?? ''} />

        <button className="button">{submitButtonDescription}</button>
      </form>
      <button className="button back-button" onClick={() => navigate('/')}>
        ⬅ К списку партнеров
      </button>
    </div>
  );
}
