{
                name: "secp256k1 schnorr",
                hash: "sha256",
                cls: class extends Xr {
                    async getPublicKey() {
                        const t = Wt.fromHex(Ue.getPublicKey(this.props.privKey)),
                            [e, n] = [t.x, t.y].map((t) => jr(t));
                        return { hex: t.toHex(), x: e, y: n };
                    }
                    async sign() {
                        const t = qr(this.props.message),
                            e = He.randomBytes(),
                            n = await Ue.sign(t, this.props.privKey, e),
                            r = Ue.Signature.fromHex(n),
                            [i, o] = [r.r, r.s].map((t) => jr(t));
                        return { msg: Zr(t), auxRand: Zr(e), r: i, s: o, sigHex: r.toHex() };
                    }
                    renderPoint() {
                        return Lr("div", {
                            className: "curve-data",
                            children: [
                                Lr("h3", { children: "Public key" }),
                                Lr("table", {
                                    children: Lr("tbody", {
                                        children: [
                                            Lr("tr", { children: [Lr("td", { children: "x" }), Lr("td", { children: Lr("code", { children: this.state.x }) })] }),
                                            Lr("tr", { children: [Lr("td", { children: "y" }), Lr("td", { children: Lr("code", { children: this.state.y }) })] }),
                                            Lr("tr", { children: [Lr("td", { children: "hex" }), Lr("td", { children: Lr("code", { children: this.state.hex }) })] }),
                                        ],
                                    }),
                                }),
                                Lr("h3", { children: "Signature" }),
                                Lr("table", {
                                    children: Lr("tbody", {
                                        children: [
                                            Lr("tr", { children: [Lr("td", { children: "msg" }), Lr("td", { children: Lr("code", { children: this.state.msg }) })] }),
                                            Lr("tr", { children: [Lr("td", { children: "auxRand" }), Lr("td", { children: Lr("code", { children: this.state.auxRand }) })] }),
                                            Lr("tr", { children: [Lr("td", { children: "r" }), Lr("td", { children: Lr("code", { children: this.state.r }) })] }),
                                            Lr("tr", { children: [Lr("td", { children: "s" }), Lr("td", { children: Lr("code", { children: this.state.s }) })] }),
                                            Lr("tr", { children: [Lr("td", { children: "sigHex" }), Lr("td", { children: Lr("code", { children: this.state.sigHex }) })] }),
                                        ],
                                    }),
                                }),
                            ],
                        });
                    }
                },
            }