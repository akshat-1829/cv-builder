// src/components/Dashboard/PaymentDialog.tsx

import React, { useState } from 'react';
import {
  Box,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Divider,
  FormControl,
  FormLabel,
} from '@mui/material';
import PaymentIcon from '@mui/icons-material/Payment';
import ShareIcon from '@mui/icons-material/Share';
import DownloadIcon from '@mui/icons-material/Download';
import { CommonDialog, DialogAction } from '@cv-builder/ui-theme';

interface PaymentDialogProps {
  open: boolean;
  action: 'share' | 'download' | null;
  onClose: () => void;
  onSuccess: () => void;
}

export const PaymentDialog: React.FC<PaymentDialogProps> = ({
  open,
  action,
  onClose,
  onSuccess,
}) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');

  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');

  const price = action === 'share' ? 49 : 99;

  const handlePayment = async () => {
    setError('');
    setProcessing(true);

    try {
      // Validation
      if (paymentMethod === 'card') {
        if (!cardNumber || !expiryDate || !cvv || !name) {
          throw new Error('Please fill in all card details');
        }
      }

      // API call
      const response = await fetch('/api/payment/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action,
          amount: price,
          paymentMethod,
          cardDetails: { cardNumber, expiryDate, cvv, name },
        }),
      });

      if (!response.ok) throw new Error('Payment failed');

      setTimeout(() => {
        setProcessing(false);
        onSuccess();
      }, 1500);
    } catch (err: any) {
      setError(err.message);
      setProcessing(false);
    }
  };

  const actions: DialogAction[] = [
    {
      label: 'Cancel',
      onClick: onClose,
      variant: 'outlined',
      disabled: processing,
    },
    {
      label: `Pay ₹${price}`,
      onClick: handlePayment,
      variant: 'contained',
      color: 'primary',
      loading: processing,
      startIcon: <PaymentIcon />,
    },
  ];

  return (
    <CommonDialog
      open={open}
      onClose={onClose}
      title={action === 'share' ? 'Share CV' : 'Download CV'}
      titleIcon={action === 'share' ? <ShareIcon /> : <DownloadIcon />}
      actions={actions}
      maxWidth="sm"
      error={error}
      disableBackdropClick={processing}
    >
      <Box
        sx={{
          mb: 3,
          p: 2,
          bgcolor: 'primary.50',
          borderRadius: 2,
          border: 1,
          borderColor: 'primary.200',
        }}
      >
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {action === 'share' ? 'Get a shareable link' : 'Download as PDF'}
        </Typography>
        <Typography variant="h4" fontWeight="bold" color="primary.main">
          ₹{price}
        </Typography>
      </Box>

      <FormControl component="fieldset" sx={{ mb: 2 }}>
        <FormLabel component="legend" sx={{ fontWeight: 600, mb: 1 }}>
          Payment Method
        </FormLabel>
        <RadioGroup
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <FormControlLabel
            value="card"
            control={<Radio />}
            label="Credit/Debit Card"
          />
          <FormControlLabel value="upi" control={<Radio />} label="UPI" />
          <FormControlLabel
            value="netbanking"
            control={<Radio />}
            label="Net Banking"
          />
        </RadioGroup>
      </FormControl>

      <Divider sx={{ my: 2 }} />

      {paymentMethod === 'card' && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            fullWidth
            label="Card Number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              fullWidth
              label="Expiry"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
            />
            <TextField
              fullWidth
              label="CVV"
              type="password"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
            />
          </Box>
          <TextField
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Box>
      )}

      <Box sx={{ mt: 2, p: 1.5, bgcolor: 'grey.50', borderRadius: 1 }}>
        <Typography variant="caption" color="text.secondary">
          🔒 Secure and encrypted
        </Typography>
      </Box>
    </CommonDialog>
  );
};
