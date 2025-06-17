const Card = ({title, amount,icon, desc}) => {

  if (icon !== '') {
    return <div className='feature-item'>
    <img
      src={icon}
      alt='Icon'
      className='feature-icon'
    />
    <h3 className='feature-item-title'>{title}</h3>
    <p>{desc}</p>
  </div>
  }
  return <section className='account'>
        <div className='account-content-wrapper'>
          <h3 className='account-title'>{title}</h3>
          <p className='account-amount'>{amount}</p>
          <p className='account-amount-description'>{desc}</p>
        </div>
        <div className='account-content-wrapper cta'>
          <button className='transaction-button'>View transactions</button>
        </div>
      </section>
}

export default Card 