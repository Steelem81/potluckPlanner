import Buffet2 from '../data/buffet2.jpg'
const WelcomeText = props => {

    return (
        <div className="container">
            <div className="row">
                <div className='col-5 m-2 p-3'>
                    <img src={Buffet2} alt="Buffet2" height={400}/>
                </div>
                <div className='col-4 m-2 p-3'>
                    <p>Cupcake ipsum dolor sit amet gummi bears chupa chups. Donut cotton candy bear claw croissant marzipan topping dragée donut gingerbread. Jelly-o cupcake cotton candy tootsie roll chocolate bonbon cotton candy. Halvah dragée gingerbread topping shortbread.</p>
                    <p>Gummi bears muffin lemon drops fruitcake bear claw. Pudding tootsie roll dragée marzipan toffee cake jelly-o cheesecake. Gummies bonbon cookie sweet roll jelly-o. </p>
                </div>
            </div>
        </div>
    )
}

export default WelcomeText;