import '../Home/_home.scss'
import models from '../../common/models'
import Card from '../../components/Card'

const Home = () => {
  const {features}=models
  return (
    <main>
      <div className='hero'>
        <section className='hero-content'>
          <h2 className='sr-only'>Promoted Content</h2>
          <p className='subtitle'>No fees.</p>
          <p className='subtitle'>No minimum deposit.</p>
          <p className='subtitle'>High interest rates.</p>
          <p className='text'>Open a savings account with Argent Bank today!</p>
        </section>
      </div>
      <section className='features'>
        <h2 className='sr-only'>Features</h2>
        {features.map((feat, index) => (
            <Card
              key={index}
              icon={feat.icon}
              title={feat.title}
              desc={feat.desc}
              amount=''
            />
          ))}
      </section>
    </main>
  )
}
export default Home