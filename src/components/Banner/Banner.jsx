import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ribbonImg from '../../assets/img/ribbon.png';
import './Banner.css';

const apiUrl = 'https://api.escuelajs.co/api/v1/products';
const maxBannerItems = 5;
const carouselIntervalMs = 3000;

const sortProductsByPriceDescending = (products) => {
    return [...products].sort((firstProduct, secondProduct) => secondProduct.price - firstProduct.price);
};

const getTopExpensiveProducts = (products, limit) => {
    const sortedProducts = sortProductsByPriceDescending(products);
    return sortedProducts.slice(0, limit);
};

const BannerComp = () => {
    const [premiumProducts, setPremiumProducts] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        const abortController = new AbortController();

        const fetchBannerProducts = async () => {
            try {
                const response = await axios.get(apiUrl, { signal: abortController.signal });
                const expensiveItems = getTopExpensiveProducts(response.data, maxBannerItems);
                setPremiumProducts(expensiveItems);
            } catch (error) {
                if (!axios.isCancel(error)) {
                    setHasError(true);
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchBannerProducts();

        return () => {
            abortController.abort();
        };
    }, []);

    const handlePrev = () => {
        setCurrentIndex((previousIndex) =>
            previousIndex === 0 ? premiumProducts.length - 1 : previousIndex - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((previousIndex) =>
            previousIndex === premiumProducts.length - 1 ? 0 : previousIndex + 1
        );
    };

    useEffect(() => {
        if (isLoading || hasError || premiumProducts.length === 0 || isPaused) {
            return;
        }

        const timerId = setInterval(() => {
            setCurrentIndex((previousIndex) =>
                previousIndex === premiumProducts.length - 1 ? 0 : previousIndex + 1
            );
        }, carouselIntervalMs);

        return () => clearInterval(timerId);
    }, [isLoading, hasError, premiumProducts, isPaused]);

    if (isLoading) return <div className="bannerLoadingState">Cargando mercancías de valor...</div>;
    if (hasError) return <div className="bannerErrorState">No se pudieron cargar los productos del reino.</div>;
    if (premiumProducts.length === 0) return null;

    const activeProduct = premiumProducts[currentIndex];

    return (
        <section
            className="siteBannerWoodContainer"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            aria-label="Mercancías destacadas del reino"
        >
            <div className="bannerGoldFrame">
                <header className="bannerRibbonHeader">
                    <img
                        src={ribbonImg}
                        alt=""
                        aria-hidden="true"
                        className="bannerRibbonImage"
                    />
                    <h3 className="bannerRibbonTitle">Mercancías de Élite</h3>
                </header>

                <article key={activeProduct.id} className="bannerCardActive">
                    <div className="bannerImageWrapper">
                        <img
                            src={activeProduct.images[0]}
                            alt={activeProduct.title}
                            className="bannerImage"
                        />
                    </div>
                    <div className="bannerInfo">
                        <span className="premiumBadge">
                            ✦ {activeProduct.category?.name || 'CLOTHES'} ✦
                        </span>
                        <h2 className="productTitle">{activeProduct.title}</h2>
                        <p className="productPrice">
                            <span className="priceAmount">{activeProduct.price}</span>{' '}
                            <span className="priceCurrency">MONEDAS DE ORO</span>
                        </p>

                        <div className="bannerActions">
                            <Link
                                to="/store"
                                state={{ selectedProductId: activeProduct.id, selectedProduct: activeProduct }}
                                className="bannerButton"
                            >
                                VER EN LA TIENDA
                            </Link>
                            <div className="arrowControls">
                                <button
                                    className="navArrowBtn"
                                    onClick={handlePrev}
                                    aria-label="Anterior"
                                >
                                    ‹
                                </button>
                                <button
                                    className="navArrowBtn"
                                    onClick={handleNext}
                                    aria-label="Siguiente"
                                >
                                    ›
                                </button>
                            </div>
                        </div>

                        <div className="bannerIndicators" role="tablist" aria-label="Diapositivas de mercancías">
                            {premiumProducts.map((_, index) => (
                                <button
                                    key={index}
                                    className={`indicatorDot ${index === currentIndex ? 'activeDot' : ''}`}
                                    onClick={() => setCurrentIndex(index)}
                                    aria-label={`Ir a la diapositiva ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </article>
            </div>
        </section>
    );
};

export default BannerComp;