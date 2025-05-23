import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, RadioGroup, FormControlLabel, Radio, Card, CardContent, Button } from '@mui/material';
import { motion } from 'framer-motion';
import './Plans.css';

const Plans = () => {
  const [membershipType, setMembershipType] = useState(() => {
    const saved = localStorage.getItem('membershipType');
    return saved || 'private';
  });

  const plans = [
      {
    title: 'Free Consultation',
    price: '$0',
    description: '30-minute intro call',
    features: ['Get to know your coach', 'Ask questions', 'No commitment'],
    consultation: true, 
     },
    {
      title: '1 Session',
      price: '$50',
      description: 'Perfect for trying out',
      features: ['60-minute session', 'Personal attention', 'Flexible scheduling'],
    },
    {
      title: '6 Sessions',
      price: '$250',
      description: 'Most Popular',
      features: ['Save $50', 'Flexible scheduling', 'Progress tracking'],
      popular: true,
    },
    {
      title: '10 Sessions',
      price: '$350',
      description: 'Best Deal',
      features: ['Save $150', 'Priority booking', 'Video analysis included'],
      bestDeal: true,
    },
  ];

  const [selectedPlan, setSelectedPlan] = useState(plans[0].title);

  // Save membershipType when it changes
  useEffect(() => {
    localStorage.setItem('membershipType', membershipType);
  }, [membershipType]);

  // Save selectedPlan when it changes
  useEffect(() => {
    localStorage.setItem('selectedPlan', selectedPlan);
  }, [selectedPlan]);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
      },
    }),
  };

  return (
    <Box component="section" className="plans-section" id="plans">
      <Container>
        <Typography variant="h3" align="center" gutterBottom>
          Plans & Pricing
        </Typography>

        <Box className="membership-toggle">
          <RadioGroup
            row
            value={membershipType}
            onChange={(e) => setMembershipType(e.target.value)}
          >
            <FormControlLabel
              value="member"
              control={<Radio />}
              label="I'm a member in SANISports"
            />
            <FormControlLabel
              value="private"
              control={<Radio />}
              label="Private student"
            />
          </RadioGroup>
        </Box>

        {membershipType === 'member' ? (
          <Box className="member-message">
            <Typography variant="h5" align="center">
              You can proceed to book a lesson.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              href="#booking"
              className="book-now-button"
            >
              Book Now
            </Button>
          </Box>
        ) : (
          <Box className="pricing-cards">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.title}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
              >
                <Card 
                  className={`pricing-card ${plan.popular ? 'popular' : ''} ${plan.bestDeal ? 'best-deal' : ''}`}
                  elevation={plan.popular || plan.bestDeal ? 8 : 2}
                  onClick={() => setSelectedPlan(plan.title)}
                  style={{
                    border: selectedPlan === plan.title ? '2px solid #1976d2' : 'none',
                    cursor: 'pointer'
                  }}
                >
                  {(plan.popular || plan.bestDeal) && (
                    <div className="badge">
                      {plan.popular ? 'Popular' : 'Best Deal'}
                    </div>
                  )}
                  <CardContent>
                    <Box display="flex" justifyContent="center" mb={2}>
                      <Radio
                        checked={selectedPlan === plan.title}
                        onChange={() => setSelectedPlan(plan.title)}
                        color="primary"
                        value={plan.title}
                        name="plan-radio"
                        inputProps={{ 'aria-label': plan.title }}
                      />
                    </Box>
                    <Typography variant="h5" component="h2">
                      {plan.title}
                    </Typography>
                    <Typography variant="h4" component="p" className="price">
                      {plan.price}
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                      {plan.description}
                    </Typography>
                    <ul className="features-list">
                      {plan.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Plans;