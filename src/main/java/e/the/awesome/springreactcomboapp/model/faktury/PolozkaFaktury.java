package e.the.awesome.springreactcomboapp.model.faktury;

import e.the.awesome.springreactcomboapp.model.faktury.Faktura;

import javax.persistence.*;

@Entity
@Table(name = "polozka_faktury")
public class PolozkaFaktury {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;

    @Column(length = 10, nullable = false)
    private String popis;

    @Column
    private Double cenaZaJednotku;

    @Column(length = 10)
    private String jednotka;

    @Column
    private Double mnozstvi;

    @Column(nullable = false)
    private double cenaCelkem;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="faktura_id", nullable=false)
    private Faktura faktura;

    public PolozkaFaktury(int id, String popis, Double cenaZaJednotku, String jednotka, Double mnozstvi, double cenaCelkem, Faktura faktura) {
        this.id = id;
        this.popis = popis;
        this.cenaZaJednotku = cenaZaJednotku;
        this.jednotka = jednotka;
        this.mnozstvi = mnozstvi;
        this.cenaCelkem = cenaCelkem;
        this.faktura = faktura;
    }

    public PolozkaFaktury(){

    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getPopis() {
        return popis;
    }

    public void setPopis(String popis) {
        this.popis = popis;
    }

    public Double getCenaZaJednotku() {
        return cenaZaJednotku;
    }

    public void setCenaZaJednotku(Double cenaZaJednotku) {
        this.cenaZaJednotku = cenaZaJednotku;
    }

    public String getJednotka() {
        return jednotka;
    }

    public void setJednotka(String jednotka) {
        this.jednotka = jednotka;
    }

    public Double getMnozstvi() {
        return mnozstvi;
    }

    public void setMnozstvi(Double mnozstvi) {
        this.mnozstvi = mnozstvi;
    }

    public double getCenaCelkem() {
        return cenaCelkem;
    }

    public void setCenaCelkem(double cenaCelkem) {
        this.cenaCelkem = cenaCelkem;
    }

    public Faktura getFaktura() {
        return faktura;
    }

    public void setFaktura(Faktura faktura) {
        this.faktura = faktura;
    }
}
