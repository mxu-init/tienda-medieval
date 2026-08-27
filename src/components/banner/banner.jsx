import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const apiUrl = 'https://api.escuelajs.co/api/v1/products';
const MaxBannerItems = 5;
const CarouselIntervalMs = 3000;

const DynamicBanner = () => {
    const [premiumProducts, setPremiumProducts] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    const sortProductsByPriceDescending = (products) => {
        return [...products].sort((firstProduct, secondProduct) => secondProduct.price - firstProduct.price);
    };

    const getTopExpensiveProducts = (products, limit) => {
        const sortedProducts = sortProductsByPriceDescending(products);
        return sortedProducts.slice(0, limit);
    };

    // Efecto 1: Carga de datos de la API
    useEffect(() => {
        const fetchBannerProducts = async () => {
            try {
                const response = await axios.get(apiUrl);
                const expensiveItems = getTopExpensiveProducts(response.data, MaxBannerItems);

                setPremiumProducts(expensiveItems);
            } catch (error) {
                console.error('Failed to load high value inventory:', error);
                setHasError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBannerProducts();
    }, []);

    useEffect(() => {
        if (isLoading || hasError || premiumProducts.length === 0 || isPaused) {
            return;
        }

        const startCarouselTimer = () => {
            return setInterval(() => {
                setCurrentIndex((previousIndex) =>
                    previousIndex === premiumProducts.length - 1 ? 0 : previousIndex + 1
                );
            }, CarouselIntervalMs);
        };

        const timerId = startCarouselTimer();

        return () => clearInterval(timerId);
    }, [isLoading, hasError, premiumProducts, isPaused]);

    if (isLoading) return <div className="loadingState">Loading exclusive offers...</div>;
    if (hasError) return <div className="errorState">Unable to load premium products.</div>;
    if (premiumProducts.length === 0) return null;

    const activeProduct = premiumProducts[currentIndex];

    return (
        <section
            className="dynamicBannerContainer"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className="bannerWrapper">
                <article key={activeProduct.id} className="bannerCardActive">
                    <div className="bannerImageWrapper">
                        <img
                            src={activeProduct.images[0]}
                            alt={activeProduct.title}
                            className="bannerImage"
                        />
                    </div>
                    <div className="bannerInfo">
                        <span className="premiumBadge">Premium Selection</span>
                        <h2 className="productTitle">{activeProduct.title}</h2>
                        <p className="productPrice">${activeProduct.price}</p>
                        <Link to={`/product/${activeProduct.id}`} className="bannerButton">
                            Buy Now
                        </Link>
                    </div>
                </article>
            </div>

            <div className="bannerIndicators">
                {premiumProducts.map((_, index) => (
                    <button
                        key={index}
                        className={`indicatorDot ${index === currentIndex ? 'activeDot' : ''}`}
                        onClick={() => setCurrentIndex(index)}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
};

export default DynamicBanner;