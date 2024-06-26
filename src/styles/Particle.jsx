import React, { useEffect, useRef } from 'react';

class Particle {
    constructor(color, quadrant, options) {
        this.options = options;
        this.color = this.parseColor(color);
        this.shape = this.getRandomShape();
        this.size = Math.abs(this.getRandomFloatInRange(this.options.size));
        this.setInitialPosition(quadrant);
        this.vx = this.getRandomFloatInRange(this.options.speed.x) * this.getRandomDirection();
        this.vy = this.getRandomFloatInRange(this.options.speed.y) * this.getRandomDirection();
    }

    parseColor(color) {
        let colorComponents;
        if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(color)) {
            colorComponents = color.substring(1).split('');
            if (colorComponents.length === 3) {
                colorComponents = [
                    colorComponents[0],
                    colorComponents[0],
                    colorComponents[1],
                    colorComponents[1],
                    colorComponents[2],
                    colorComponents[2],
                ];
            }
            const hex = `0x${colorComponents.join('')}`;
            return {
                r: (hex >> 16) & 255,
                g: (hex >> 8) & 255,
                b: hex & 255,
            };
        }
        return { r: 0, g: 0, b: 0 };
    }

    getRandomShape() {
        return this.options.shapes[Math.floor(Math.random() * this.options.shapes.length)];
    }

    getRandomDirection() {
        return Math.random() > 0.5 ? 1 : -1;
    }

    getRandomFloatInRange(range) {
        if (range.min === range.max) return range.min;
        const delta = range.max - range.min;
        return Math.random() * delta + range.min;
    }

    setInitialPosition(quadrant) {
        const position = this.getRandomPositionInCanvas();
        switch (quadrant) {
            case 3:
                this.x = position.x + position.halfWidth;
                this.y = position.y;
                break;
            case 2:
                this.x = position.x;
                this.y = position.y + position.halfHeight;
                break;
            case 1:
                this.x = position.x + position.halfWidth;
                this.y = position.y + position.halfHeight;
                break;
            default:
                this.x = position.x;
                this.y = position.y;
        }
    }

    getRandomPositionInCanvas() {
        const halfWidth = this.options.c.w / 2;
        const halfHeight = this.options.c.h / 2;
        return {
            x: Math.random() * halfWidth,
            y: Math.random() * halfHeight,
            halfHeight,
            halfWidth,
        };
    }

    animate(ctx, width, height) {
        if (this.options.size.pulse) {
            this.size += this.options.size.pulse * this.getRandomDirection();
            if (this.size > this.options.size.max || this.size < this.options.size.min) {
                this.size = Math.abs(this.size);
            }
        }

        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) {
            this.vx *= -1;
            this.x += 1;
        } else if (this.x > width) {
            this.vx *= -1;
            this.x -= 1;
        }

        if (this.y < 0) {
            this.vy *= -1;
            this.y += 1;
        } else if (this.y > height) {
            this.vy *= -1;
            this.y -= 1;
        }

        ctx.beginPath();
        if (this.options.blending && this.options.blending !== 'none') {
            ctx.globalCompositeOperation = this.options.blending;
        }

        const centerColor = this.colorToRgba(this.color, this.options.opacity.center);
        const edgeColor = this.colorToRgba(this.color, this.options.opacity.edge);
        const radius = this.getRadius();

        const gradient = ctx.createRadialGradient(this.x, this.y, 0.01, this.x, this.y, radius);
        gradient.addColorStop(0, centerColor);
        gradient.addColorStop(1, edgeColor);
        ctx.fillStyle = gradient;

        switch (this.shape) {
            case 'c':
                ctx.arc(this.x, this.y, Math.abs(this.size / 2), 0, Math.PI * 2, false);
                break;
            case 's':
                this.drawSquare(ctx, radius);
                break;
            case 't':
                this.drawTriangle(ctx, radius);
                break;
            default:
                break;
        }

        ctx.closePath();
        ctx.fill();
    }

    getRadius() {
        switch (this.shape) {
            case 'c':
                return this.size / 2;
            case 't':
                return Math.tan((30 * Math.PI) / 180) * (this.size / 2);
            case 's':
                return this.size / Math.sqrt(2);
            default:
                return this.size;
        }
    }

    drawSquare(ctx, radius) {
        const halfSize = radius / 2;
        ctx.moveTo(this.x - halfSize, this.y + halfSize);
        ctx.lineTo(this.x + halfSize, this.y + halfSize);
        ctx.lineTo(this.x + halfSize, this.y - halfSize);
        ctx.lineTo(this.x - halfSize, this.y - halfSize);
    }

    drawTriangle(ctx, radius) {
        const height = this.getRadius();
        ctx.moveTo(this.x, this.y - 2 * height);
        ctx.lineTo(this.x - radius, this.y + height);
        ctx.lineTo(this.x + radius, this.y + height);
    }

    colorToRgba(color, alpha) {
        return `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
    }
}

class FinisherHeader {
    constructor(options) {
        this.options = options;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.setAttribute('id', 'finisher-canvas');
        this.getContainer(options.className).appendChild(this.canvas);

        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => this.resize(), 150);
        });

        this.init(options);
        window.requestAnimationFrame(() => this.animate());
    }

    getContainer(className) {
        const containers = document.getElementsByClassName(className || 'finisher-header');
        if (!containers.length) throw new Error('No .finisher-header element found');
        return containers[0];
    }

    resize() {
        this.options.c = { w: window.innerWidth, h: window.innerHeight };
        this.canvas.width = this.options.c.w;
        this.canvas.height = this.options.c.h;

        const skewTransform = this.calculateSkewTransform();
        this.canvas.setAttribute(
            'style',
            `position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:-1;-webkit-transform:${skewTransform};transform:${skewTransform};outline:1px solid transparent;background-color:rgba(${this.bgColor.r},${this.bgColor.g},${this.bgColor.b},1);`
        );
    }

    calculateSkewTransform() {
        const skew = Math.tan((this.options.skew * Math.PI) / 180) * (this.options.c.w / 2);
        return `skewY(${this.options.skew}deg) translateY(-${skew}px)`;
    }

    init(options) {
        this.options = options;
        this.bgColor = this.parseColor(this.options.colors.background);
        this.particles = [];
        this.resize();
        this.createParticles();
    }

    parseColor(color) {
        let colorComponents;
        if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(color)) {
            colorComponents = color.substring(1).split('');
            if (colorComponents.length === 3) {
                colorComponents = [
                    colorComponents[0],
                    colorComponents[0],
                    colorComponents[1],
                    colorComponents[1],
                    colorComponents[2],
                    colorComponents[2],
                ];
            }
            const hex = `0x${colorComponents.join('')}`;
            return {
                r: (hex >> 16) & 255,
                g: (hex >> 8) & 255,
                b: hex & 255,
            };
        }
        return { r: 0, g: 0, b: 0 };
    }

    createParticles() {
        this.particles = [];
        const count = window.innerWidth < 600 && this.options.count > 5 ? Math.round(this.options.count / 2) : this.options.count;

        for (let i = 0; i < count; i++) {
            const quadrant = i % 4;
            const particle = new Particle(this.options.colors.particles[i % this.options.colors.particles.length], quadrant, this.options);
            this.particles.push(particle);
        }
    }

    animate() {
        window.requestAnimationFrame(() => this.animate());
        this.ctx.clearRect(0, 0, this.options.c.w, this.options.c.h);
        this.particles.forEach(particle => particle.animate(this.ctx, this.options.c.w, this.options.c.h));
    }
}

const FinisherCanvas = () => {

    const options = {
        className: 'finisher-header',
        colors: {
            background: '#000000', // Background color
            particles: ['#ff0000', '#00ff00', '#0000ff'], // Particle colors
        },
        blending: 'screen',
        count: 30,
        opacity: {
            center: 0.8,
            edge: 0.0,
        },
        size: {
            min: 10,
            max: 30,
            pulse: 0.01,
        },
        speed: {
            x: { min: 0.1, max: 0.5 },
            y: { min: 0.1, max: 0.5 },
        },
        shapes: ['c', 's', 't'],
        skew: 10,
    };

    const canvasRef = useRef(null);

    useEffect(() => {
        if (canvasRef.current) {
            new FinisherHeader({ ...options, className: canvasRef.current.parentElement.className });
        }
    }, [options]);

    return <div ref={canvasRef} className="finisher-header" />;
};

export default FinisherCanvas;