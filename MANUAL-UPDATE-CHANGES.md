# Airtel SmartConnect Manual Update – Changes Summary

**Source:** ZLT X17U-W154R PLUS User Manual (Version V1.1)  
**Date:** February 2026

---

## 1. Product Models

| Component   | Old (Current Site) | New (Manual)  |
|------------|--------------------|---------------|
| Outdoor    | ZLT X17M           | ZLT X17U      |
| Indoor     | ZLT W304VA PRO     | ZLT W154R PLUS |

**Product name:** ZLT X17U-W154R PLUS

---

## 2. Technical Specifications

### Outdoor Unit

| Spec               | Old    | New    |
|--------------------|--------|--------|
| Operating temp     | -30°C to +60°C | -30°C to +60°C (unchanged) |
| Relative humidity  | 5% to 95% | 5% to 95% (unchanged) |
| Dimensions         | 195×110×42 mm | 195×110×42 mm (unchanged) |
| Weight             | ~600 g | **~630 g** |

### Indoor Unit

| Spec               | Old              | New              |
|--------------------|------------------|------------------|
| Working temp       | 0°C to +40°C     | 0°C to +40°C (unchanged) |
| Relative humidity  | 5% to 95%        | 5% to 95% (unchanged) |
| Power supply       | AC 100–240 V     | AC 100 V–240 V, 50–60 Hz |
| Output             | DC 12 V/2 A      | DC 12 V/2 A (unchanged) |
| Dimensions         | 230×140×150 mm   | **138×186×54 mm** |
| Weight             | 470 g            | **~209 g** |

---

## 3. SIM Card Location

| Old (Current Site)                    | New (Manual)                              |
|--------------------------------------|-------------------------------------------|
| SIM in **outdoor** unit (antenna)    | SIM in **indoor** unit (router)           |
| Bottom of antenna, behind screws     | SIM slot on rear of indoor unit           |
| —                                    | **Warning:** Do not insert/remove SIM while device is powered on |

---

## 4. Main / Router LED Indicators

### Old (Current Site)

- Red – initial boot
- Purple/violet – booting
- Blue – connecting
- Green – powered on (WiFi ready; does **not** indicate internet)

### New (Manual)

| Indicator           | Meaning                                      |
|---------------------|----------------------------------------------|
| Red (flashing)      | No communication with outdoor unit           |
| Red (always on)     | Internet not connected                       |
| Green (always on)   | Internet connected                           |
| Green (flashing)    | WPS mode (returns to normal after ~120 s)    |
| White (flashing)    | Factory restore or system upgrade            |

**Auto light-off (optional):** If enabled, LED turns off ~5 min after boot. Pressing WPS makes it flash per original color, then off again after ~5 min.

---

## 5. Outdoor Unit LEDs (Same 5-Indicator Layout)

| LED         | States             | Description                              |
|-------------|--------------------|------------------------------------------|
| 1. 4G Status  | On / Off         | Connected to 4G or not                   |
| 2. 5G Status  | On / Off         | Connected to 5G or not                   |
| 3. Signal     | Red / Yellow / Green / Off | Weak / medium / excellent / no signal |
| 4. ETH        | On / Flashing / Off | Link normal / data / not connected   |
| 5. Power      | On / Off         | Powered normally or not                  |

---

## 6. Outdoor Unit Interfaces

| Old (Current Site)                     | New (Manual)                               |
|---------------------------------------|--------------------------------------------|
| SIM slot inside, behind screws        | No SIM slot                                |
| Reset button inside compartment       | **#6 Restore factory** – press 3 s         |
| —                                     | **#7 RJ45** – network + PoE                |
| —                                     | **#8 DC** – power input                    |

---

## 7. Indoor Unit Interfaces

### Old (Current Site)

- W/LAN1 (WAN), LAN ports, USB, DC

### New (Manual)

| Interface | Description |
|-----------|-------------|
| DC        | Power input |
| WAN       | PoE to outdoor unit + data |
| LAN1–LAN4 | Wired network / computers |
| RESET     | Press 3–6 s to restore factory |
| WPS       | 1–3 s = 5G WPS; 6–12 s = 2.4G WPS |
| SIM       | SIM card slot (see warning in Section 3) |

---

## 8. Factory Reset

| Old (Current Site)                                | New (Manual)                                                          |
|---------------------------------------------------|-----------------------------------------------------------------------|
| Outdoor: Open antenna screws → reset inside       | Outdoor: Press Restore factory button for **3 seconds**               |
| Indoor: RESET 6 seconds                           | Indoor: RESET **3–6 seconds**; white flashing indicates restore       |

---

## 9. Installation & Connection

### New Manual Instructions

**SIM insertion**

- Insert SIM into the indoor unit slot in the direction shown.
- Do not insert/remove while device is powered on.

**Outdoor unit**

- Choose suitable length of RJ45 cable.
- Use standard 8-core cable: **CAT5E or CAT6**.
- Install waterproof cover on cable.
- Insert cable into RJ45 port on outdoor unit.

**Mounting**

- **Step 4:** Attach bracket A to outdoor unit with screws; connect ground wire.
- **Step 5:** Fix bracket B to outdoor post with hoops.
- **Step 6:** Buckle bracket A onto bracket B, lock screws; installation complete.

---

## 10. Access to Data Terminal (Management)

- RJ45 connection, no drivers required.
- Compatible with Windows XP/7/8/10, Mac OS, Linux, Android.
- **Readiness checks:** Power on, SIM installed, ETH light on, network and signal lights on.
- **Connecting computers:** Use RJ45, set computer to obtain IP automatically.
- **Access:** Enter management address in browser; username and password are on the **nameplate** (device label).

---

## 11. Web Configuration Menu Structure (New)

| Primary Menu        | Secondary Menu / Options                                |
|---------------------|---------------------------------------------------------|
| System Status       | WAN, DHCP, Device info                                  |
| Internet Function   | Network (mode, flight mode, data switch), APN, SIM      |
| Wi-Fi Settings      | 2.4G, 5G (on/off, SSID, password, encryption, channel)  |
| Device Settings     | DHCP, routing                                           |
| Firewall            | DMZ, port mapping, filters, URL filter, IP–MAC binding  |
| Management          | Password, factory restore, time, logs, upgrade, diagnosis, reboot |

**Notes:** Wi‑Fi channel changes not recommended for non-professionals. Upgrade usually needs professional handling.

---

## 12. Features to Remove or Revise

| Feature             | Action |
|---------------------|--------|
| Rechargeable battery | Remove (not in new manual) |
| NFC OneHop          | Remove (not in new manual) |
| TZLink app          | Revise or remove if not supported on new model |
| W/LAN1 port name    | Replace with **WAN** |
| Old router LED sequence | Replace with new LED meanings (Section 4) |
| SIM in outdoor unit | Replace with SIM in indoor unit |
| Router ports: USB   | Remove if not present on ZLT W154R PLUS |

---

## 13. Files to Update

| File                                   | Updates                                                                 |
|----------------------------------------|-------------------------------------------------------------------------|
| `src/app/product/overview/page.tsx`    | Models, specs, SIM location, installation, features, schema, FAQs       |
| `src/app/product/troubleshooting/page.tsx` | LED guide, outdoor/indoor interfaces, reset, SIM, ports, config menu |
| `src/app/product/_old-content-backup.md` | Already contains backup of old content                              |

---

## 14. SEO / Schema Updates

- Product schema: ZLT X17M → ZLT X17U; ZLT W304VA PRO → ZLT W154R PLUS
- Keywords: Replace ZLT X17M W304VA PRO with ZLT X17U W154R PLUS
- HowTo (SIM installation): Update steps for indoor unit SIM slot
- Device label: Management address, username, password from **nameplate**; confirm if 192.168.1.1 / admin / admin remains valid for new model

---

## 15. Important Warnings from New Manual

1. **SIM:** Do not insert or remove SIM while device is powered on.
2. **Wi‑Fi:** Non-professionals should avoid changing Wi‑Fi channel settings.
3. **APN:** Use operator-recommended settings; wrong config can block internet access.
4. **Management address:** Use the address printed on the device nameplate.
